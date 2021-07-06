import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./components/Column";
import { Container } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  const classes = useStyles();
  /*
    TODO: It's really important how you structure your data!!!
      each column has to have a unique id, each item has to have a unique id and ideally consecutive else funky things happen
      each droppable has to have a unique id, each draggable also - cannot stress this enough because that is the only way
      the framework knows how what went from which list
    */
  // const initialColumns = {
  //   todo: {
  //     id: "todo",
  //     list: [
  //       { id: "1", text: "text1" },
  //       { id: "2", text: "text2" },
  //       { id: "3", text: "text3" },
  //     ],
  //   },
  //   doing: {
  //     id: "doing",
  //     list: [
  //       { id: "4", text: "text4" },
  //       { id: "5", text: "text5" },
  //       { id: "6", text: "text6" },
  //     ],
  //   },
  //   done: {
  //     id: "done",
  //     list: [],
  //   },
  // };

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/columns")
      .then((res) => res.json())
      .then((data) => setColumns(data));
  }, []);

  const onDragEnd = ({ source, destination }) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      console.log(start);
      const newItems = start.items.filter((_, idx) => idx !== source.index);

      // Then insert the item at the right location
      newItems.splice(destination.index, 0, start.items[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        items: newItems,
      };

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartItems = start.items.filter(
        (_, idx) => idx !== source.index
      );

      // Create a new start column
      const newStartCol = {
        id: start.id,
        items: newStartItems,
      };

      // Make a new end list array
      const newEndItems = end.Items;

      // Insert the item into the end list
      newEndItems.splice(destination.index, 0, start.items[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        items: newEndItems,
      };

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          <Grid container spacing={3} direction={"row"} justify={"center"}>
            {Object.values(columns).map((column) => {
              console.log(column);
              return (
                <Grid item xs={12} md={6} lg={4} key={column.id}>
                  <Column column={column} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </DragDropContext>
    </ThemeProvider>
  );
}

export default App;

const useStyles = makeStyles((theme) => ({}));
