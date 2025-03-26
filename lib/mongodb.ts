import { MongoClient, Db} from "mongodb";

// Create a new MongoClient
const client = new MongoClient(process.env.MONGODB_URI as string);

// variable to track connection status
let connected = false;

//function to connect to the tmpdatabase
export async function connectToDatabase(): Promise<Db> {
    // if not connected yet, establish a connection
    if (!connected) {
        await client.connect();
        connected = true; // set connected to true after successful connection
        console.log("Connected successfully to MongoDB");
    }
    // define the database name
    const database = "tmpdatabase";
    // check if the database exists, if not throw an error stating that the database does not exist
    const dbList = await client.db().admin().listDatabases();
    const dbExists = dbList.databases.some(db => db.name === database);
    if (!dbExists) {
        throw new Error(`Database ${database} does not exist`);
    }
    // return the database object    
    return client.db(database); // Return tmpdatabase after connection
}
