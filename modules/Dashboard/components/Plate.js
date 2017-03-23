import {
  Card,
  CardActions,
  CardMedia,
  CardText,
  CardTitle,
} from "material-ui/Card";
import React, { PropTypes } from "react";

import FlatButton from "material-ui/FlatButton";
import Link from "next/link";
import RemovePlateDialog from "./RemovePlateDialog";

const Plate = props => {
  const {
    name,
    plateId,
    description,
    removePlate,
    refetch,
    cardImage,
    removePlateDialogOpen,
    openRemovePlateDialog,
    closeRemovePlateDialog
  } = props;

  return (
    <Card style={{ borderRadius: 5 }}>
      <CardMedia overlay={<CardTitle title={name} />}>
        <img
          style={{ borderTopRightRadius: 5, borderTopLeftRadius: 5 }}
          src={cardImage}
          width="208"
          height="214"
        />
      </CardMedia>
      <CardText expandable>
        {description}
      </CardText>
      <CardActions>
        <FlatButton
          label="Wash Plate"
          secondary
          onTouchTap={() => openRemovePlateDialog()}
        />
        <Link prefetch href={`/platefiller?id=${plateId}`}>
          <a><FlatButton primary label="Fill Plate" /></a>
        </Link>
      </CardActions>
      <RemovePlateDialog
        removePlateDialogOpen={removePlateDialogOpen}
        closeRemovePlateDialog={closeRemovePlateDialog}
        removePlate={removePlate}
        refetch={refetch}
        plateId={plateId}
      />
    </Card>
  );
};

Plate.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  plateId: PropTypes.string,
  removePlate: PropTypes.func,
  refetch: PropTypes.func,
  cardImage: PropTypes.string,
  removePlateDialogOpen: PropTypes.bool,
  openRemovePlateDialog: PropTypes.func,
  closeRemovePlateDialog: PropTypes.func
};

export default Plate;