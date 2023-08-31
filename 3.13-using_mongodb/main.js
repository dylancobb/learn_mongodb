const { MongoClient } = require('mongodb');

async function main() {
	const uri = "mongodb://localhost:27017";
	const client = new MongoClient(uri);

	try {
		await client.connect();
		await listDatabases(client);
		await insertFreddie(client);
		await listContacts(client);
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}
}

async function listDatabases(client) {
	databasesList = await client.db().admin().listDatabases();

	console.log("Databases:");
	databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function insertFreddie(client) {
	const myDB = client.db("recipe_db"),
		myColl = myDB.collection("contacts"),
		doc = { name: "Freddie Mercury", email: "fred@queen.com" };

	await myColl.insertOne(doc)
};

async function listContacts(client) {
	const myDB = client.db("recipe_db"),
		myColl = myDB.collection("contacts");

	const cursor = myColl.find();
	for await (const doc of cursor) {
		console.dir(doc);
	}
};

main().catch(console.error);