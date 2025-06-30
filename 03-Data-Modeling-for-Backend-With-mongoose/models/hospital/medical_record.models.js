import mongoose from "mongoose";

const medicalRecordSchema = mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },
  hospital:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  treatment: {
    type: String
  },
  prescription: {
    type: String
  },
  notes: {
    type: String
  },
  visitDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
