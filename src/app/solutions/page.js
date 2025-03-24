import { fetchQuizData } from "../fetchData/page";
import Navbar from "../components/Navbar";

const quiz = async () => {
  const quizData = await fetchQuizData();
  return (
    <>
      <Navbar links={[{ name: "Home", href: "/" }]} />
      <div className="max-w-screen-xl m-auto px-4 text-lg">
        <h2 className="font-bold text-2xl my-20 ml-2">
          All the quizzes questions and answers are available here for a look 👀
        </h2>
        {quizData.quizCategories.map((quizCategory) => (
          <div
            key={quizCategory.id}
            className="bg-black/20 p-4 my-4 rounded-3xl border border-teal-300/20"
          >
            <h2 className="text-2xl font-black mb-4">{quizCategory.name}</h2>
            {quizCategory.questions.map((questionItem, index) => (
              <div key={index} className="mb-6">
                <p>
                  <strong>Question:</strong> {questionItem.question}
                </p>
                <p>
                  <strong>Correct Answer:</strong> {questionItem.answer}
                </p>
                <p>
                  <strong>Alternatives:</strong>
                </p>
                <ul>
                  {questionItem.alternatives.map((alternative, altIndex) => (
                    <li className="list-disc list-inside" key={altIndex}>
                      {alternative}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default quiz;
