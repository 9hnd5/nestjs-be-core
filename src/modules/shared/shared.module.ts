import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'modules/common/common.module';
import { ScopeVariableModule } from 'modules/scope-variable/scope-variable.module';
import { ExampleModel } from './models/example.model';
import QueriesList from './queries'
import RepositoriesList from './repositories'

@Module({
    imports: [
        ScopeVariableModule,
        CommonModule,
        TypeOrmModule.forFeature([ExampleModel])
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
