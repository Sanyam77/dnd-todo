import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import { Draggable } from "react-beautiful-dnd";

import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { yellow } from "@material-ui/core/colors";

const Task = ({ itemObject, index }) => {
  return (
    <Draggable draggableId={itemObject.id} key={itemObject.id} index={index}>
      {(provided) => (
        <ListItem
          key={itemObject.id}
          role={undefined}
          dense
          button
          ContainerComponent="li"
          ContainerProps={{ ref: provided.innerRef }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // style={{
          //   padding: "0 10px",
          // }}
        >
          <ListItemText
            sytles={{ fontFamily: "Quicksand" }}
            primary={`${itemObject.title}`}
            secondary={`${itemObject.content.slice(0, 32)}...`}
          />
          <IconButton
            edge="end"
            // aria-label="comments"
            // question-uid={itemObject.id}
          >
            <WebAssetIcon color="primary" />
          </IconButton>
          <IconButton
            edge="end"
            // aria-label="comments"
            // question-uid={itemObject.id}
          >
            <DeleteIcon color="secondary" />
          </IconButton>
          <ListItemSecondaryAction />
          {/* https://stackoverflow.com/questions/60756561/issue-in-react-beautiful-dnd-with-material-ui-list */}
          {/* <Card elevation={2}>
            <CardHeader
              avatar={<Avatar>T</Avatar>}
              action={
                <IconButton
                // onClick={() => {
                //   handleDelete(note.id);
                // }}
                >
                  <DeleteOutlined />
                </IconButton>
              }
              title="A task"
              subheader={itemObject.id}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                {itemObject.text}
              </Typography>
            </CardContent>
          </Card> */}
        </ListItem>
      )}
    </Draggable>
  );
};

export default Task;
