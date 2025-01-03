import mongoose from 'mongoose';
import app from './app';
import config from './app/config/index';
import seedSuperAdmin from './app/DB';

async function main() {
	try {
		if (!config?.database_url) {
			throw new Error('Database URL is not provided');
		}
		await mongoose.connect(config.database_url as string);
		seedSuperAdmin();
		app.listen(config.port, () => {
			console.log(`App running on port ${config.port}`);
		});
	} catch (error) {
		console.log(error);
	}
}

main();
