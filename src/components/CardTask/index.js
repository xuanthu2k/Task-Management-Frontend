import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import pageStyles from "../../styles/pageStyles";

function CardTask(props) {
    const { handleClickCard, task } = props;
    const classes = pageStyles();
    return (
        <Card className={classes.card} onClick={() => handleClickCard(task._id)}>
            <CardContent>
                <Typography variant="h5" component="h2" className={classes.title}>
                    {task.Title.length < 22 ? task.Title : task.Title.slice(0, 22) + "..."}
                </Typography>
                <Typography className={classes.description} color="textSecondary">
                    {task.Description.length < 30
                        ? task.Description
                        : task.Description.slice(0, 30) + "..."}
                </Typography>
                <Typography variant="body2" className={classes.status}>
                    Status: {task.Status}
                </Typography>
                <Typography variant="body2" className={classes.dueDate}>
                    Due Date:{" "}
                    {new Date(task.DueDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default React.memo(CardTask);
