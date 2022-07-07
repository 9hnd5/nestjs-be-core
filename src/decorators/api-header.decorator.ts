import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { HeaderKeys } from 'constants/const';

export function Headers(): ClassDecorator {
    return applyDecorators(
        ApiHeader({
            name: HeaderKeys.AccessToken.toLowerCase(),
            description: 'The access token',
        }),
        ApiHeader({
            name: HeaderKeys.RefreshToken.toLowerCase(),
            description: 'The refresh token',
        }),
        ApiHeader({
            name: HeaderKeys.AppName.toLowerCase(),
            description: 'The agent',
        }),
        ApiHeader({
            name: HeaderKeys.AppBuildNumber.toLowerCase(),
            description: 'The agent version',
        }),
        ApiHeader({
            name: HeaderKeys.RequestId.toLowerCase(),
            description: 'The unique request id',
        }),
        ApiHeader({
            name: HeaderKeys.TenantCode.toLowerCase(),
            description: 'The tenant code',
        })
    );
}
