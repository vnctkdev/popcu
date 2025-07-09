import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['popup', 'festival', 'concert'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  region: { type: String, required: true },
  imageUrl: { type: String, required: true },
  link: { type: String, required: true },
  description: { type: String },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Event', EventSchema); 