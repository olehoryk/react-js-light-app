import React, { useState } from 'react';

const JavaScriptTutorial = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [codeInput, setCodeInput] = useState('');
  const [output, setOutput] = useState('');
  const [lessonComplete, setLessonComplete] = useState(false);

  const lessons = [
    {
      title: "Основи JavaScript: Змінні та типи даних",
      theory: `
        JavaScript має декілька типів змінних: let, const, var.
        Типи даних включають: string, number, boolean, object, array.
        
        Приклад оголошення змінних:
        let name = "John";
        const age = 30;
        var isStudent = true;
      `,
      challenge: "Створіть змінну з іменем 'greeting' зі значенням 'Вітаємо, світ JavaScript!'",
      expectedOutput: 'Вітаємо, світ JavaScript!',
      testCode: (code) => {
        try {
          // eslint-disable-next-line no-new-func
          const testFunction = new Function(`return ${code}`);
          const result = testFunction();
          return result === 'Вітаємо, світ JavaScript!';
        } catch (error) {
          return false;
        }
      }
    },
    {
      title: "Функції та стрілочні функції",
      theory: `
        Функції в JavaScript можуть бути оголошені декількома способами.
        Стрілочні функції - сучасний синтаксис для компактного запису.
        
        Приклади:
        function classic(x) { return x * 2; }
        const arrow = (x) => x * 2;
      `,
      challenge: "Напишіть стрілочну функцію, яка повертає квадрат числа",
      expectedOutput: 16,
      testCode: (code) => {
        try {
          // eslint-disable-next-line no-new-func
          const testFunction = new Function(`return ${code}`);
          const result = testFunction()(4);
          return result === 16;
        } catch (error) {
          return false;
        }
      }
    }
  ];

  const handleCodeSubmit = () => {
    const currentLessonData = lessons[currentLesson];
    
    try {
      const isCorrect = currentLessonData.testCode(codeInput);
      
      if (isCorrect) {
        setOutput('✅ Чудово! Код пройшов перевірку.');
        setLessonComplete(true);
      } else {
        setOutput('❌ Невірний код. Спробуйте ще раз.');
        setLessonComplete(false);
      }
    } catch (error) {
      setOutput('❌ Помилка в коді. Перевірте синтаксис.');
      setLessonComplete(false);
    }
  };

  const moveToNextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(prev => prev + 1);
      setCodeInput('');
      setOutput('');
      setLessonComplete(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        Інтерактивний тренажер JavaScript
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">
            {lessons[currentLesson].title}
          </h2>
          <pre className="bg-gray-50 p-4 rounded-md text-sm">
            {lessons[currentLesson].theory}
          </pre>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-medium mb-2">Завдання:</h3>
          <p className="text-gray-700">{lessons[currentLesson].challenge}</p>
        </div>

        <div className="mb-4">
          <textarea 
            rows="6"
            className="w-full p-2 border rounded-md"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            placeholder="Введіть код JavaScript"
          />
        </div>

        <div className="flex space-x-4">
          <button 
            onClick={handleCodeSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Перевірити код
          </button>

          {lessonComplete && (
            <button 
              onClick={moveToNextLesson}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Наступний урок
            </button>
          )}
        </div>

        {output && (
          <div className={`mt-4 p-3 rounded ${
            output.includes('✅') ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {output}
          </div>
        )}

        <div className="mt-6 text-center text-gray-500">
          Урок {currentLesson + 1} з {lessons.length}
        </div>
      </div>
    </div>
  );
};

export default JavaScriptTutorial;
