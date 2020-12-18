import React from 'react'
import styled from 'styled-components';

import { UNAUTH_ROUTES, RenderRoutes } from '../../constants/routes'

export const UnAuthenticatedApp = () => {
    return (
        <AppWrapper>
            <RenderRoutes routes={UNAUTH_ROUTES} />
        </AppWrapper>
    );
};

const AppWrapper = styled.div`
    height: 100%;
    width: 100%;
`;
