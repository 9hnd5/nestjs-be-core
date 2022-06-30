import { Module } from '@nestjs/common';
import { CommonModule } from 'modules/common';
import { ScopeVariableModule } from 'modules/scope-variable';
import QueriesList from './queries'
import RepositoriesList from './repositories'

@Module({
    imports: [
        ScopeVariableModule,
        CommonModule
    ],
    providers: [
        ...QueriesList,
        ...RepositoriesList
    ],
    exports: [
        ...QueriesList,
        ...RepositoriesList
    ]
})
export class SharedModule { }
