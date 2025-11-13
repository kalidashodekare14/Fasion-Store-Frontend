import OrderTrackComponent from '@/components/pages/BuyerComponents/OrderTrackComponent';
import { Box } from '@chakra-ui/react';
import React from 'react';

const OrderTrack = () => {
    return (
        <Box gap={3} lg={{ px: "5%", py: "2%" }} backgroundColor={"#bbbb"}>
            <OrderTrackComponent />
        </Box>
    );
};

export default OrderTrack;