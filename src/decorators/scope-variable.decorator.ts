import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ScopeVariable as S } from 'models/common.model';

export const ScopeVariable = createParamDecorator((data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.scopeVariable as S;
});
