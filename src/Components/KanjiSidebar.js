import { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import { KanjiDisplay } from "../Context/KanjiContext";

export function KanjiSidebar() {
  const { kanji } = useContext(KanjiDisplay);
  console.log(kanji);
  return (
    <>
      <Container className="square bg-primary rounded">
        <div className="text-center">{kanji}</div>
      </Container>
    </>
  );
}
