import { useEffect, useState, useRef } from "react";
import "./App.css";
import { Button, Stack } from "@mui/material";
import gameOfLife from "./gameOfLife";

function App() {
  const [grid, setGrid] = useState([[]]);
  const [inProgress, setInProgress] = useState(false);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const rows = Math.floor(window.innerHeight / 22);
      const columns = Math.floor(window.innerWidth / 22);
      setGrid(
        Array.from({ length: rows }, () =>
          Array.from({ length: columns }, () => Math.round(Math.random() * 0.8))
        )
      );
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const randomizeGrid = () => {
    setGrid(grid.map((row) => row.map(() => Math.round(Math.random() * 0.8))));
  };

  const startGame = () => {
    setInProgress(true);
    setStarted(true);
    intervalRef.current = setInterval(() => {
      setGrid((prevGrid) => gameOfLife(prevGrid));
    }, 250);
  };

  const pauseGame = () => {
    setInProgress(false);
    clearInterval(intervalRef.current);
  };

  const resetGame = () => {
    pauseGame();
    randomizeGrid();
    setStarted(false);
  };

  const toggleGame = () => {
    if (inProgress) {
      pauseGame();
    } else {
      startGame();
    }
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ marginBottom: "1rem" }}
      >
        <Button
          variant="contained"
          onClick={started ? resetGame : randomizeGrid}
        >
          {started ? "Reset" : "Randomize"}
        </Button>
        <Button variant="contained" onClick={toggleGame}>
          {inProgress ? "Pause" : "Start"}
        </Button>
      </Stack>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {grid.map((row, rowIndex) => (
          <div key={`row${rowIndex}`} style={{ display: "flex" }}>
            {row.map((cell, colIndex) => (
              <div
                key={`col${colIndex}`}
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: cell === 1 ? "black" : "white",
                  border: "1px solid lightgray",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
