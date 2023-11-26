var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import mongoose from 'mongoose';
const app = express();
const uri = 'mongodb+srv://server-user:ny64PL2nMSFpqs7z@myapp.pifuust.mongodb.net/?retryWrites=true&w=majority';
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect(uri);
            console.log('connected to mongo db');
        }
        catch (err) {
            console.log(err);
        }
    });
}
connect();
app.listen(8000, () => {
    console.log('listen port 8000');
});
//# sourceMappingURL=index.js.map