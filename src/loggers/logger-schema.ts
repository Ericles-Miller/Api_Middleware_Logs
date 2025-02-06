import { Schema } from 'mongoose';

export const LoggerSchema = new Schema({
  method: { type: String, required: true },
  url: { type: String, required: true },
  statusCode: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  movieId: { type: String, required: false },
  ip: { type: String, required: true },
  level: { type: String, required: true },
  timeRequest: { type: Number, required: true },
});
