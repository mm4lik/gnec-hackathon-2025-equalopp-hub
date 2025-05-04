# Basic AI engine (placeholder — can swap with OpenAI later)
def basic_feedback(answers):
    correct = sum(1 for a in answers if a == "inclusive")
    if correct / len(answers) >= 0.8:
        return "Excellent allyship!"
    elif correct / len(answers) >= 0.5:
        return "Good, but you can improve."
    else:
        return "Consider learning more about inclusive practices."
