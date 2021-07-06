import { Droppable } from "react-beautiful-dnd";
import RootRef from "@material-ui/core/RootRef";
import List from "@material-ui/core/List";
import Task from "./Task";
import Typography from "@material-ui/core/Typography";
import { Paper, Container, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { StayPrimaryPortraitTwoTone } from "@material-ui/icons";
const useStyles = makeStyles((theme) => {
  return {
    column: {
      // padding: theme.spacing(2),
      // padding: "20px",
      // boxSizing: "border-box",
      // margin: "20px",
    },
  };
});
const Column = ({ column }) => {
  const classes = useStyles();
  return (
    // <Container className={classes.container}>
    <Card className={classes.column}>
      <CardContent>
        <Typography variant={"h4"}>{column.name}</Typography>
        <Droppable droppableId={column.id}>
          {(provided) => (
            <RootRef rootRef={provided.innerRef}>
              <List>
                {column.items.map((itemObject, index) => {
                  return <Task index={index} itemObject={itemObject} />;
                })}
                {provided.placeholder}
              </List>
            </RootRef>
          )}
        </Droppable>
      </CardContent>
    </Card>
    // </Container>
  );
};

export default Column;
