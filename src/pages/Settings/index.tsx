import React from 'react'
import List from './components/List'
import NavHeader from '../../components/NavHeader'
import ContainerView from '../../components/ContainerView'

const Settings = ({ onLogout }: { onLogout: (name: string) => void }) => {

  return (
    <ContainerView>
      <NavHeader title="设置" back={true} />
      <List onLogout={onLogout} />
    </ContainerView>

  )
}

export default Settings