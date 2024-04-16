import mongoose, { Schema, model, models } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const MachineSchema = new Schema({
  machine_name: {
    type: String,
  },
  description: {
    type: String,
  },
  total_quantity: {
    type: Number,
  },
  available_quantity: {
    type: Number,
  },
  category: {
    type: String,
  },
  subparts: [
    {
      machine_id: Schema.Types.ObjectId,
    },
  ],
  orders: [
    {
      purchase_date: String,
      model: String,
      make: String,
      build_number: Number,
      quantity: Number,
      vendor: String,
    },
  ],
  current: [
    {
      issue_id: Schema.Types.ObjectId,
    },
  ],
  completed: [
    {
      issue_id: Schema.Types.ObjectId,
    },
  ],
});

const Machine = models.Machine || model("Machine", MachineSchema);

export default Machine;
