import app from './app.js';
import Logger from "./core/logger";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    Logger.info(`Server running at http://localhost:${PORT}`);
});
