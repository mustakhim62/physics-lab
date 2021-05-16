# physics-lab
Physics Lab

# Как загружать изменения на главную ветку master для всех.
1. Делаем любые изменения с файлами, добавляем файлы, удаляем и так далее
2. Когда все изменения закончили, создаем коммит на своей стороне (на своем компьютере, не в облаке) через Commit All
3. Второй шаг можно повторять несколько раз
4. Когда все коммиты (со своими сообщениями) готовы, отправляем в облако через Push
5. Заходим в браузер и создаем Pull request (другими словами, заявку на слияние с основной master версией)
6. После создания заявки, открываем ее и подтверждаем через Merge
7. Теперь все эти изменения с версии Devel со всеми коммитами тоже есть в master,
   а master уже видят все пользователи (студенты)

# Начальная подготовка файлов перед работой.
1. Добавил файлы как есть в папку Physics-lab (без изменений)

2. Создал коммит и написал сообщение, что добавил новые файлы

3. Открываем файл index.html, внизу справа меняем кодировку чтения, нажав на UTF-8.
   Далее выберем Reopen with encoding и выберем Cyrillic (Windows 1251).
   После этого файл должен читаться нормально, без всяких непонятных символов.
   Заметим, что сам файл не меняется. Меняется только то, как мы его читаем.

4. Теперь будем менять файл. Там же внизу справа нажимаем теперь уже на кнопку Cyrillic (Windows 1251).
   Далее выбираем Save with encoding и выбираем UTF-8.

5. После этого сохраняем файл (можно нажать Control s или наверху слева выбираем File и нажимаем Save).
   Теперь файл изменен и сохранен.

6. Выбираем веточки и создаем Коммит с сообщением, что мы поменяли коджировку.

7. Делаем тоже самое и с другими файлами.

8. Для каждого файла выполняем следующее.
   Чтобы отформатировать документ к удобному виду, нажимаем правной кнопкой в пустоту в файле и выбираем Format Document.

# Работа с файлами
1. Проверить, что charset в тэге meta равен utf-8, иначе браузер не поймет, как читать этот файл.

2. Меняет текст с русского на казахский.

3. Не забываем регулярно сохранять файл, чтоб не потерять изменения.

4. После каких-то значительных изменений, можно даже создать Коммит, чтоб это осталось в истории.