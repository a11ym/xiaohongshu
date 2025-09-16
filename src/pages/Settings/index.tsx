import React from 'react'
import List from './components/List'
import NavHeader from '../../components/NavHeader'
import ContainerView from '../../components/ContainerView'

const Settings = () => {

  return (
    <ContainerView>
      <NavHeader title="设置" back={true} />
      <List />
    </ContainerView>

  )
}

export default Settings