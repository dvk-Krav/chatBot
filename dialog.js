// user requests
const prompts = [
    ["привіт", "добрий день", "доброго часу доби"],

    ["що ти вмієш?", "покажи що вмієш?"],

    ["як по новому називається фіту?"],
   ]
    
   // Possible responses, in corresponding order
    
   const replies = [
    ["Доброго дня, чим можу допомогти?", "Доброго часу доби, я бот-асистент, запитайте мене, що я вмію"],

    ["Я можу спробувати допомогти Вам, з пошуком необхідної інформації"],

    ["Тепер Ваш факультет називається ФІТМ. Посилання на оновлену сторінку Вашого факультету: https://fitm.kubg.edu.ua"],
   ]

   
// Random for any other user input
const alternative = [
    "За запитом нічого не знайдено",
    "Хм... Я нічого не знайшов",
]