import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Text } from "@react-three/drei";
import { Canvas } from "react-three-fiber";

function App() {
  const nodesCubes = new Array(30).map((el, i) => {
    return <Cube key={i} />;
  });
  return (
    <Canvas>
      // here you can pass a lot of options as prop
      <group>{nodesCubes}</group>
      <group position={[0, 0.1, 0.1]}>
        <mesh>
          <boxBufferGeometry attach="geometry" args={[20, 20, 20]} />
          <meshStandardMaterial attach="material" color={0xf95b3c} />
        </mesh>
      </group>
    </Canvas>
  );
}

const Home = () => <App />;

export default Home;
