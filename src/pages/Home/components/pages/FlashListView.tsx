import { FlashList } from "@shopify/flash-list";
import React, { useState } from "react";
import ContainerView from "../../../../components/ContainerView";
import RenderItem from "../../../../components/RenderItem";
import data from '../../Data'

const FlashListView = () => {
  const [refreshing, setRefreshing] = useState(false)
  return (
    <ContainerView>
      <FlashList
        data={data}
        masonry
        numColumns={2}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true)
          setTimeout(() => {
            setRefreshing(false)
          }, 2000)
        }}
        renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
      />
    </ContainerView>
  )
}

export default FlashListView
