import { useEffect, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { PointerLockControls } from "@react-three/drei"
import * as THREE from "three"

export default function FreeControls({ objects }) {
  const { camera } = useThree()
  const keys = useRef({})
  const velocity = useRef(new THREE.Vector3())
  const raycaster = useRef(new THREE.Raycaster())

  useEffect(() => {
    const handleKeyDown = (e) => (keys.current[e.code] = true)
    const handleKeyUp = (e) => (keys.current[e.code] = false)

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  useFrame(() => {
    const speed = 0.1
    velocity.current.set(0, 0, 0)

    if (keys.current["KeyW"]) velocity.current.z -= speed
    if (keys.current["KeyS"]) velocity.current.z += speed
    if (keys.current["KeyA"]) velocity.current.x -= speed
    if (keys.current["KeyD"]) velocity.current.x += speed
    if (keys.current["Space"]) velocity.current.y += speed
    if (keys.current["ShiftLeft"]) velocity.current.y -= speed

    const move = velocity.current.clone().applyEuler(camera.rotation)

    if (move.length() > 0) {
      raycaster.current.set(camera.position, move.clone().normalize())
      const intersects = raycaster.current.intersectObjects(objects || [], true)

      if (intersects.length === 0 || intersects[0].distance > 1.5) {
        camera.position.add(move)
      }
    }
  })

  return <PointerLockControls />
}
