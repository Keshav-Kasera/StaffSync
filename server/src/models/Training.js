const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a training title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a training description'],
    },
    category: {
      type: String,
      required: true,
      default: 'Professional Development',
    },
    duration: {
      type: String,
      default: '4 Weeks',
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    enrolledEmployees: [
      {
        employee: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Employee',
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        status: {
          type: String,
          enum: ['Not Started', 'In Progress', 'Completed'],
          default: 'Not Started',
        },
        progressPercentage: {
          type: Number,
          default: 0,
          min: 0,
          max: 100,
        },
        completionDate: {
          type: Date,
        },
      },
    ],
    materialsUrl: {
      type: String,
      default: '',
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Training = mongoose.model('Training', trainingSchema);
module.exports = Training;
