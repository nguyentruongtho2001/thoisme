import { resources } from "../../../utils/resources";
import { Mesh, Vector3, Euler, Group, ShaderMaterial, LinearSRGBColorSpace } from "three";
import { scene } from "../../core/scene";
import { animations } from "./animations";
import { sceneWeights, sceneWeightsInOut } from "../../../animations/scenes";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import { face } from "./face";
import { leftDesktop as avatarLeftDesktop } from "./left-desktop";
import matcapVertexShader from "../../shaders/avatar-matcap/vertex.glsl";
import matcapFragmentShader from "../../shaders/avatar-matcap/fragment.glsl";
import headVertexShader from "../../shaders/avatar-head/vertex.glsl";
import headFragmentShader from "../../shaders/avatar-head/fragment.glsl";
import gsap from "gsap";
import { aboutProgress } from "../../../animations/transitions/about";
//import { avatarHologram } from "./hologram";

import type { Material, Bone, Texture } from "three";

let mesh: Mesh | null = null;
let rightHandBone: Bone | null = null;

const tIdleIntensity = { value: 0 };

const waypointsPosition = new Vector3();
const waypointsRotation = new Euler();
const transform = new Group();
const uniforms = { uProgress: { value: 0 }, uAmbientStrength: { value: 0 } };
const contactPosition = new Vector3(0, -13, 0);
const contactRotation = new Euler(0, -Math.PI, 0);

// Slight width squeeze to hint at a slim build (1 = unchanged). Easily reverted.
const THIN_SCALE = 0.93;

// Hairline: the top part of the head mesh is darkened to black (hair).
const HAIR_TOP_RATIO = 0.7;
let headHairY = 0;

// Recolor palette (per mesh name) to give the avatar a different look.
// color is [r,g,b] 0-255; amount is the mix factor (0 = original, 1 = full tint).
const RECOLOR: Record<string, { color: [number, number, number]; amount: number }> = {
  // Pale / fair skin (Asian, light complexion)
  skin: { color: [0xf5, 0xe9, 0xdd], amount: 0.55 },
  head: { color: [0xf5, 0xe9, 0xdd], amount: 0.5 },
  black: { color: [0x3a, 0x44, 0x52], amount: 0.55 },
  gray: { color: [0x4d, 0x6a, 0x63], amount: 0.6 },
  white: { color: [0xe2, 0xd6, 0xc0], amount: 0.5 },
};

const toTint = (name: string) => {
  const item = RECOLOR[name];
  if (!item) return { value: new Vector3(1, 1, 1), amount: 0 };
  return {
    value: new Vector3(item.color[0] / 255, item.color[1] / 255, item.color[2] / 255),
    amount: item.amount,
  };
};

const init = () => {
  setupMesh();
  transform.scale.set(THIN_SCALE, 1, 1);
  animations.init();
  face.init();
  avatarLeftDesktop.init();
  gsap.ticker.add(tick);
};

const getMaterial = (name: string): Material | null => {
  if (name === "face") return face.getMaterial();
  if (name === "head") {
    const texture = resources.items["head-texture"];
    texture.flipY = false;
    texture.colorSpace = LinearSRGBColorSpace;
    texture.generateMipmaps = false;
    const tint = toTint("head");
    return new ShaderMaterial({
      vertexShader: headVertexShader,
      fragmentShader: headFragmentShader,
      transparent: true,
      uniforms: {
        uHeadTexture: { value: texture },
        uTint: { value: tint.value },
        uTintAmount: { value: tint.amount },
        uHairY: { value: headHairY },
        ...uniforms,
      },
    });
  }

  const tex = resources.items["matcap-black"];
  tex.colorSpace = LinearSRGBColorSpace;
  tex.generateMipmaps = false;

  const tint = toTint(name);

  return new ShaderMaterial({
    vertexShader: matcapVertexShader,
    fragmentShader: matcapFragmentShader,
    transparent: true,
    uniforms: {
      uMatcap: { value: tex },
      uTint: { value: tint.value },
      uTintAmount: { value: tint.amount },
      ...uniforms,
    },
  });
};

const assignMatcap = (child: Mesh): boolean => {
  let tex: Texture | null = null;

  if (child.name === "black") {
    tex = resources.items["matcap-black"];
  } else if (child.name === "gray") {
    tex = resources.items["matcap-gray"];
  } else if (child.name === "skin") {
    tex = resources.items["matcap-skin"];
  } else if (child.name === "white") {
    tex = resources.items["matcap-white"];
  }

  if (tex) {
    tex.colorSpace = LinearSRGBColorSpace;
    child.userData.matcap = tex;
    return true;
  }

  return false;
};

const setupMesh = () => {
  if (mesh) return;
  const resource = resources.items["avatar-model"];
  mesh = cloneSkeleton(resource.scene.children[0]) as Mesh;

  mesh.frustumCulled = false;

  const headMesh = mesh.getObjectByName("head") as Mesh | null;
  if (headMesh) {
    headMesh.geometry.computeBoundingBox();
    const hb = headMesh.geometry.boundingBox!;
    headHairY = hb.min.y + (hb.max.y - hb.min.y) * HAIR_TOP_RATIO;
  }

  mesh.traverse((child) => {
    if (child instanceof Mesh) {
      const mat = getMaterial(child.name);
      if (!mat) return;
      child.material = mat;
      child.frustumCulled = false;
      child.renderOrder = child.name === "face" ? 25 : 24;

      const hasMatcap = assignMatcap(child);
      if (hasMatcap) {
        child.onBeforeRender = () => {
          child.material.uniforms.uMatcap.value = child.userData.matcap;
        };
      }
    }
  });

  const brain = mesh.getObjectByName("brain") as Mesh;
  if (brain) {
    mesh.remove(brain);
  }

  mesh.rotation.z = 0;

  transform.add(mesh);

  rightHandBone = mesh.getObjectByName("bone-right-hand") as Bone;

  scene.instance.add(transform);
};

const tick = () => {
  animations.update();

  const isContact = sceneWeights.contact > 0.001;

  if (isContact) {
    transform.position.copy(contactPosition);
    transform.rotation.copy(contactRotation);
    uniforms.uProgress.value = 0;
    uniforms.uAmbientStrength.value = 0;
    transform.visible = true;
    return;
  }

  transform.position.copy(waypointsPosition);
  transform.rotation.copy(waypointsRotation);

  //uniforms.uProgress.value = sceneWeightsInOut.about.in * 1.1 - 0.1;
  uniforms.uProgress.value = aboutProgress.value * 1.1 - 0.1;
  uniforms.uAmbientStrength.value = sceneWeightsInOut.about.in;

  if (!mesh) return;
  if (uniforms.uProgress.value > 0.999 && sceneWeights.contact > 0.99) {
    mesh.visible = false;
  } else {
    mesh.visible = true;
  }
};

const destroy = () => {
  //mesh = null;
  //transform.clear();
  face.destroy();
  gsap.ticker.remove(tick);
};

export const avatar = {
  init,
  destroy,
  getMesh: () => mesh,
  getRightHandBone: () => rightHandBone,
  tIdleIntensity,
  waypointsPosition,
  waypointsRotation,
  uniforms,
  transform,
};
