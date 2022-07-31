import { SetMetadata } from '@nestjs/common';
export const EXCLUDE_CORE_INTERCEPTOR_KEY = Symbol('EXCLUDE_CORE_INTERCEPTOR_KEY');
export const ExcludeCoreInterceptor = () => SetMetadata(EXCLUDE_CORE_INTERCEPTOR_KEY, true);
