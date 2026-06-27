import { Schema, model, models } from "mongoose";

const TeamMemberSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    quote: { type: String, required: true },
    image: { type: String, required: true },
});

export default models.TeamMember || model("TeamMember", TeamMemberSchema);
