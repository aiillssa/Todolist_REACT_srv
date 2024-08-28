import { ObjectId } from "mongodb";

//Methods to interact with mongo -> not super necessary to make them seperate methods
//Alternative: just have them be in app or routes! Like
//router.get("/", (req,res) => {insert method here})
//Mostly seperated to understand the program flow
//and make it a bit more organized :)

export async function createTask(req, res) {
  const newTask = req.body;
  const result = await req.db.insertOne(newTask);
  res.send(`New listing created with the following id: ${result.insertedId}`);
}

export async function findByName(req, res) {
  const id = req.params.taskID;
  const result = await req.db.findOne({
    _id: ObjectId.createFromHexString(id),
  });
  if (result) {
    console.log("found listing!");
    console.log(result);
    res.send(result);
  } else {
    res.send("NO LISTING");
  }
}

//Have to use the cursor toArray function
export async function getAll(req, res) {
  const cursor = await req.db.find({});
  const result = await cursor.toArray();
  res.send(result);
  console.log(result);
}

//update
// export async function updateTaskName(req, res) {
//   const id = req.params.taskID;
//   const newName = req.body;
//   const result = await client
//     .db("updatedTodo")
//     .collection("Todos")
//     .updateOne({ id: id }, { $set: newName });
//   console.log(`${result.matchedCount} document(s) matched the query criteria.`);
//   console.log(`${result.modifiedCount} document(s) was/were updated.`);
//   res.send("updated");
// }

export async function upsert(req, res) {
  const id = req.params.taskID;
  const newName = req.body;
  const result = await req.db.updateOne(
    { _id: ObjectId.createFromHexString(id) },
    { $set: newName },
    { upsert: true }
  );
  if (result.upsertedCount > 0) {
    console.log("added new!");
    res.send("upserted");
  }
  res.send("no upsert");
}

//Delete one!

export async function deleteTodo(req, res) {
  const id = req.params.taskID;
  const result = await req.db.deleteOne({
    _id: ObjectId.createFromHexString(id),
  });
  res.send(`deleted: ${result.name}`);
}
