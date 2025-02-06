import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Logger extends Document {
  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  statusCode: number;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop()
  movieId: string;

  @Prop()
  ip: string;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  timeRequest: number;
}

export const LogSchema = SchemaFactory.createForClass(Logger);
