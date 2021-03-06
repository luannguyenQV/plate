import { compose, graphql } from 'react-apollo'
import { injectState, provideState } from 'freactal'

import Card from '../../../components/Card/Card'
import EditPlateDialog from './EditPlateDialog'
import EditPlateMutation from '../../../mutations/editPlate'
import Icon from '../../../components/Icon/Icon'
import Link from 'next/link'
import Modal from '../../../components/Modal/Modal'
import PlatesQuery from '../../../queries/plates'
import PropTypes from 'prop-types'
import React from 'react'
import RecoverPlateMutation from '../../../mutations/recoverPlate'
import RecoverPlatesQuery from '../../../queries/recoveredPlates'
import RemovePlateMutation from '../../../mutations/removePlate'

const wrapComponentWithState = provideState({
  initialState: () => ({
    washPlateOpen: false,
    editPlateOpen: false
  }),
  effects: {
    washPlateHandleOpen: () => state =>
      Object.assign({}, state, { washPlateOpen: true }),
    washPlateHandleClose: () => state =>
      Object.assign({}, state, { washPlateOpen: false }),
    editPlateHandleOpen: () => state =>
      Object.assign({}, state, { editPlateOpen: true }),
    editPlateHandleClose: () => state =>
      Object.assign({}, state, { editPlateOpen: false })
  }
})

const deletePlate = async (
  recoverPlate,
  removePlate,
  plateId,
  name,
  description,
  cardImage,
  status,
  content,
  user,
  closeModal
) => {
  await recoverPlate(
    name,
    description,
    cardImage,
    status,
    content,
    user.username
  )
  await removePlate(plateId)
  closeModal()
}

const Plate = wrapComponentWithState(
  injectState(
    ({
      state,
      effects,
      user,
      description,
      plateId,
      status,
      name,
      editPlate,
      removePlate,
      cardImage,
      content,
      recoverPlate
    }) => {
      return (
        <div>
          <Card
            headerText={name}
            avatar={cardImage}
            subheader={'Status: ' + status}
            footerItems={[
              <button
                type="button"
                key="1"
                onClick={effects.washPlateHandleOpen}
                className="secondary bordered rounded"
              >
                Wash Plate
              </button>,
              <Link key="2" prefetch href={`/platefiller?id=${plateId}`}>
                <button type="button" className="primary bordered rounded">
                  Fill Plate
                </button>
              </Link>
            ]}
            actionIcon={
              <Icon
                style={{ color: '#424242', fontSize: 30, cursor: 'pointer' }}
                type="fa fa-pencil"
                onClick={effects.editPlateHandleOpen}
              />
            }
          >
            {description}
          </Card>
          <EditPlateDialog
            editPlateOpen={state.editPlateOpen}
            editPlateHandleClose={effects.editPlateHandleClose}
            plateId={plateId}
            plateName={name}
            plateStatus={status}
            plateDescription={description}
            editPlate={editPlate}
          />
          <Modal
            open={state.washPlateOpen}
            closeModal={effects.washPlateHandleClose}
          >
            <h3 style={{ color: 'white', marginTop: 150 }}>
              Are you sure you want to remove this plate?
            </h3>
            <button
              type="button"
              onClick={() =>
                deletePlate(
                  recoverPlate,
                  removePlate,
                  plateId,
                  name,
                  description,
                  cardImage,
                  status,
                  content,
                  user,
                  effects.washPlateHandleClose
                )}
              style={{ float: 'right' }}
              className="primary"
            >
              Remove
            </button>
            <button
              type="button"
              className="secondary"
              onClick={effects.washPlateHandleClose}
            >
              Cancel
            </button>
          </Modal>
        </div>
      )
    }
  )
)

Plate.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  plateId: PropTypes.string,
  removePlate: PropTypes.func,
  cardImage: PropTypes.string,
  status: PropTypes.string,
  content: PropTypes.string,
  editPlate: PropTypes.func,
  user: PropTypes.object,
  recoverPlate: PropTypes.func
}

export default compose(
  graphql(RemovePlateMutation, {
    props: ({ mutate }) => ({
      removePlate: id => {
        return mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            removePlate: {
              __typename: 'Plate',
              id
            }
          }
        })
      }
    }),
    options: props => ({
      refetchQueries: [
        {
          query: PlatesQuery,
          variables: { username: props.user.username }
        }
      ]
    })
  }),
  graphql(RecoverPlateMutation, {
    props: ({ mutate }) => ({
      recoverPlate: (
        name,
        description,
        thumbnail,
        status,
        content,
        createdBy
      ) => {
        return mutate({
          variables: {
            name,
            description,
            thumbnail,
            status,
            content,
            createdBy
          },
          optimisticResponse: {
            __typename: 'Mutation',
            recoverPlate: {
              __typename: 'Plate',
              name,
              description,
              thumbnail,
              status,
              content,
              createdBy
            }
          }
        })
      }
    }),
    options: props => ({
      refetchQueries: [
        {
          query: RecoverPlatesQuery,
          variables: { username: props.user.username }
        }
      ]
    })
  }),
  graphql(EditPlateMutation, {
    props: ({ mutate }) => ({
      editPlate: (id, name, description, status) => {
        return mutate({
          variables: { id, name, description, status },
          optimisticResponse: {
            __typename: 'Mutation',
            editPlate: {
              __typename: 'Plate',
              id,
              name,
              description,
              status
            }
          }
        })
      }
    }),
    options: props => ({
      refetchQueries: [
        {
          query: PlatesQuery,
          variables: { username: props.user.username }
        }
      ]
    })
  })
)(Plate)
