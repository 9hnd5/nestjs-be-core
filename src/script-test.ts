import { applyMigration } from './script';
import * as path from 'path';

applyMigration(path.join(__dirname, 'modules/**.config.js'));
