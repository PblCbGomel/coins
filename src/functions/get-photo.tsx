const getPhotoOptions = {
  method: "POST",
  headers: {
    accept: "application/json",
    "User-Agent":
      "Telegram Bot SDK - (https://github.com/irazasyed/telegram-bot-sdk)",
    "content-type": "application/json",
  },
};

export function getUserPhoto({ user_id }: { user_id: string }) {
  return fetch(
    `https://api.telegram.org/${process.env.REACT_APP_BOT_TOKEN}/getUserProfilePhotos`,
    {
      ...getPhotoOptions,
      body: JSON.stringify({ user_id, offset: 1, limit: 1 }),
    }
  );
}

const getFileOptions = {
  method: "POST",
  headers: {
    accept: "application/json",
    "User-Agent":
      "Telegram Bot SDK - (https://github.com/irazasyed/telegram-bot-sdk)",
    "content-type": "application/json",
  },
};

export async function getPhotoFile({ user_id }: { user_id: string }) {
  const file_id = ((await getUserPhoto({ user_id })) as any).json()?.result
    ?.file_id;
  return fetch(
    `https://api.telegram.org/${process.env.REACT_APP_BOT_TOKEN}/getFile`,
    {
      ...getFileOptions,
      body: JSON.stringify({ file_id }),
    }
  );
}
