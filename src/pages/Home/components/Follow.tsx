import { FlashList } from "@shopify/flash-list";
import React, { useState } from "react";
import ContainerView from "../../../components/ContainerView";
import CustomRefreshControl from "../../../components/CustomRefreshControl";
import RenderItem from "../../../components/RenderItem";
import data from "../../../pages/Home/Data";

const Follow = () => {
  const [refreshing, setRefreshing] = useState(false)
  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }
  return (
    <ContainerView>
      <CustomRefreshControl
        isRefreshing={refreshing}
        onRefresh={handleRefresh}>
        <FlashList
          data={data}
          masonry
          numColumns={2}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item ,index}) => <RenderItem item={item} index={index} />}
        />
      </CustomRefreshControl>
    </ContainerView>
  )
}

export default Follow
