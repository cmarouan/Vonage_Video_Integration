import OpenTok from 'opentok';

export default function handler(req, res) {
    const { apiKey, projectSecret } = req?.query;
    const opentoken = new OpenTok(apiKey, projectSecret, { timeout: 30000 });

    res.status(200).json({ opentoken });
}
