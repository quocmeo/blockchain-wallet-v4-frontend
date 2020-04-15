import { actions } from 'data'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import {
  FiatType,
  RemoteDataType,
  SBCardType,
  SBProviderDetailsType
} from 'core/types'
import { getData } from './selectors'
import { RootState } from 'data/rootReducer'
import DataError from 'components/DataError'
import Loading from './template.loading'
import React, { PureComponent } from 'react'
import Success from './template.success'

export type OwnProps = {
  cardId?: string
  handleClose: () => void
}
export type SuccessStateType = {
  card: SBCardType
  fiatCurrency: FiatType
  providerDetails: SBProviderDetailsType
}
export type LinkDispatchPropsType = {
  simpleBuyActions: typeof actions.components.simpleBuy
}
type LinkStatePropsType = {
  data: RemoteDataType<string, SuccessStateType>
}
type Props = OwnProps & LinkDispatchPropsType & LinkStatePropsType
type State = {}

class AddCard extends PureComponent<Props, State> {
  state = {}

  componentDidMount () {
    this.props.simpleBuyActions.fetchSBCard(this.props.cardId)
  }

  render () {
    return this.props.data.cata({
      Success: val => <Success {...val} {...this.props} />,
      Failure: () => <DataError />,
      Loading: () => <Loading />,
      NotAsked: () => <Loading />
    })
  }
}

const mapStateToProps = (state: RootState): LinkStatePropsType => ({
  data: getData(state)
})

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchPropsType => ({
  simpleBuyActions: bindActionCreators(actions.components.simpleBuy, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard)