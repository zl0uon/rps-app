from flask import Flask, request, jsonify
import random

app = Flask(__name__)

# Initialize scores and history
history = []
ai_scores = []
human_scores = []
user_data = {}

# 상태 전이 테이블
transition_table = {}

# 상태 전이 테이블 업데이트
def update_transition_table(history, current_choice):
    if len(history) > 0:
        history_tuple = tuple(history)
        if history_tuple not in transition_table:
            transition_table[history_tuple] = {'가위': 0, '바위': 0, '보': 0}
        transition_table[history_tuple][current_choice] += 1

# N개의 이전 상태를 기반으로 다음 선택 예측
def predict_next_move(history):
    if len(history) > 0:
        history_tuple = tuple(history)
        if history_tuple in transition_table:
            next_move_probs = transition_table[history_tuple]
            return max(next_move_probs, key=next_move_probs.get)
    # 첫 라운드일 경우 랜덤 선택
    return random.choice(['가위', '바위', '보'])

# 승패 결정 및 점수 계산
def determine_winner(player_move, computer_move):
    if player_move == computer_move:
        return 'draw', 10  # Tie, both get 10 points
    elif (player_move == '가위' and computer_move == '보') or \
         (player_move == '바위' and computer_move == '가위') or \
         (player_move == '보' and computer_move == '바위'):
        return 'player', 15  # Player wins, they get 15 points
    else:
        return 'computer', 5  # Computer wins, player gets 5 points

@app.route('/play', methods=['POST'])
def play_game():
    player_move = request.json['player_move'].lower()

    # Get student data (student number and name) from request
    student_number = request.json['student_number']
    student_name = request.json['student_name']

    # Store the user data
    user_data['student_number'] = student_number
    user_data['student_name'] = student_name

    # 이전 N개의 선택을 기반으로 선택 예측
    computer_move = predict_next_move(history)
    print(f"컴퓨터: {computer_move}")

    # 승패 결정 및 점수 계산
    winner, score = determine_winner(player_move, computer_move)

    # 상태 전이 테이블 업데이트
    if len(history) > 0:
        update_transition_table(history, player_move)
    history.append(player_move)  # 플레이어 선택 기록

    # Store scores in the respective arrays
    if winner == 'player':
        human_scores.append(score)
        ai_scores.append(5)  # If player wins, AI gets 5 points
    elif winner == 'computer':
        ai_scores.append(score)
        human_scores.append(5)  # If AI wins, player gets 5 points
    else:
        human_scores.append(10)
        ai_scores.append(10)  # In case of a tie, both get 10 points

    # Send the updated scores and user data back to the client
    return jsonify({
        'student_number': student_number,
        'student_name': student_name,
        'human_scores': human_scores,
        'ai_scores': ai_scores,
    })

@app.route('/get_scores', methods=['GET'])
def get_scores():
    return jsonify({
        'student_number': user_data.get('student_number', ''),
        'student_name': user_data.get('student_name', ''),
        'human_scores': human_scores,
        'ai_scores': ai_scores,
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
