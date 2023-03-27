-- Note for future me: You can't simply just type `Profile` into a Lua console to get info about methods in `Profile` -
-- instead, you can do something like `PROFILEMAN:GetMachineProfile().__index`

--- @class Profile
--- @field public __index table Gives you the ``Profile`` table again
local Profile = {}

--- Returns the possible score of courses matched by ``stepsType`` and ``difficulty``
---
--- |since_itg|
---
--- @param stepsType int The steps type - see :cpp:enum:`StepsType`
--- @param difficulty int The difficulty - see :cpp:enum:`Difficulty`
---
--- @return float
function Profile:GetCoursesPossible() end

--- Returns a composite of high scores on every course matched by ``stepsType`` and ``difficulty``
---
--- |since_itg|
---
--- @param stepsType int The steps type - see :cpp:enum:`StepsType`
--- @param difficulty int The difficulty - see :cpp:enum:`Difficulty`
---
--- @return float
function Profile:GetCoursesActual(stepsType, difficulty) end

--- Returns the percentage of completed courses matching ``stepsType`` and ``difficulty``
---
--- |since_itg|
---
--- @param stepsType int The steps type - see :cpp:enum:`StepsType`
--- @param difficulty int The difficulty - see :cpp:enum:`Difficulty`
---
--- @return float
function Profile:GetCoursesPercentComplete() end

--- Returns the possible score of songs matched by ``stepsType`` and ``difficulty``
---
--- |since_itg|
---
--- @param stepsType int The steps type - see :cpp:enum:`StepsType`
--- @param difficulty int The difficulty - see :cpp:enum:`Difficulty`
---
--- @return float
function Profile:GetSongsPossible() end

--- Returns a composite of high scores on every song matched by ``stepsType`` and ``difficulty``
---
--- |since_itg|
---
--- @param stepsType int The steps type - see :cpp:enum:`StepsType`
--- @param difficulty int The difficulty - see :cpp:enum:`Difficulty`
---
--- @return float
function Profile:GetSongsActual() end

--- Returns the percentage of completed songs matching ``stepsType`` and ``difficulty``
---
--- |since_itg|
---
--- @param stepsType int The steps type - see :cpp:enum:`StepsType`
--- @param difficulty int The difficulty - see :cpp:enum:`Difficulty`
---
--- @return float
function Profile:GetSongsPercentComplete() end

--- Returns the total number of songs played
---
--- |since_itg|
---
--- @return int
function Profile:GetTotalNumSongsPlayed() end

--- Returns the number of steps scored on a specific grade, matching ``stepsType`` and ``difficulty``
---
--- |since_itg|
---
--- @param stepsType int The steps type - see :cpp:enum:`StepsType`
--- @param difficulty int The difficulty - see :cpp:enum:`Difficulty`
--- @param grade int The grade - see :cpp:enum:`Grade`
---
--- @return int
function Profile:GetTotalStepsWithTopGrade(stepsType, difficulty, grade) end

--- Returns the number of trails scored on a specific grade, matching ``stepsType`` and ``difficulty``
---
--- |since_itg|
---
--- @param stepsType int The steps type - see :cpp:enum:`StepsType`
--- @param difficulty int The difficulty - see :cpp:enum:`Difficulty`
--- @param grade int The grade - see :cpp:enum:`Grade`
---
--- @return int
function Profile:GetTotalTrailsWithTopGrade() end

--- Returns the number of times a song has been played (and completed)
---
--- |since_notitg_v1|
---
--- @param song Song The song
---
--- @return int
function Profile:GetSongNumTimesPlayed() end

--- Sets the profile's goal type
---
--- |since_itg|
---
--- @param goalType int The goal type - see :cpp:enum:`GoalType`
---
--- @return void
function Profile:SetGoalType() end

--- Returns the profile's goal type
---
--- See :cpp:enum:`GoalType`
---
--- |since_itg|
---
--- @return int
function Profile:GetGoalType() end

--- Sets a new goal, to ``calories``
---
--- |since_itg|
---
--- @param seconds The new goal to set, in calories
---
--- @return void
function Profile:SetGoalCalories(calories) end

--- Returns the number of calories needed to reach the goal
---
--- |since_itg|
---
--- @return int
function Profile:GetGoalCalories() end

--- Sets a new goal, to ``seconds``
---
--- |since_itg|
---
--- @param seconds The new goal to set, in seconds
---
--- @return void
function Profile:SetGoalSeconds(seconds) end

--- Returns the number of seconds needed to reach the goal
---
--- |since_itg|
---
--- @return int
function Profile:GetGoalSeconds() end

--- Returns the estimated number of calories burned today
---
--- |since_itg|
---
--- @return float
function Profile:GetCaloriesBurnedToday() end

--- Sets the player's weight in pounds
---
--- |since_itg|
---
--- @param pounds int The new weight to set, in pounds
---
--- @return void
function Profile:SetWeightPounds(pounds) end

--- Returns the player's weight in pounds
---
--- |since_itg|
---
--- @return int
function Profile:GetWeightPounds() end

--- ?
---
--- |since_notitg_v3_1|
---
--- @param song string The song name
--- @param steps int The steps difficulty - see :cpp:enum:`Difficulty`
---
--- @return void
function Profile:GetHighScoreForSongAndSteps(song, steps) end

--- Clears high scores for a song
---
--- |since_notitg_v4|
---
--- @param song string The song name
---
--- @return void
function Profile:ClearHighScoresForSong(song) end

--- Clears a step's high scores for a song
---
--- |since_notitg_v4|
---
--- @param song string The song name
--- @param steps int The steps difficulty - see :cpp:enum:`Difficulty`
---
--- @return void
function Profile:ClearHighScoresForSongAndSteps(song, steps) end

--- Table of arbitrary data that persists between runs of the game
---
--- Scripts can persist data (Eg: Highscores in minigames) by writing to this table.
---
--- Example usage:
---
--- .. code-block:: lua
---
---    local new_score = 9001
---
---    local profile_saved = PROFILEMAN:GetMachineProfile():GetSaved()
---
---    -- If there was no saved data before, or we got a better score than the previous highscore, save it
---    if
---      profile_saved.yourname_yoursong_highscore == nil or
---      profile_saved.yourname_yoursong_highscore < new_score
---    then
---      profile_saved.yourname_yoursong_highscore = new_score
---    end
---
--- Note that the names of keys in this table have to be shared between all charts a user may have installed. It's
--- suggested to prefix key names with a unique identifier, such as your name/the name of the song you're modding. You
--- can also nest tables inside the `GetSaved()` table, if you want to organize.
---
--- |since_itg|
---
--- @return table
function Profile:GetSaved() end

--- Returns whether the song with the given song ID is unlocked for the player
---
--- |since_itg|
---
--- @param id string The song ID
---
--- @return boolean
function Profile:IsCodeUnlocked(id) end

--- Returns the highscore for a course and trail
---
--- |since_notitg_v4_2_0|
---
--- @param course Course The course
--- @param stepsType int The steps type - see :cpp:enum:`StepsType`
--- @param difficulty int The difficulty - see :cpp:enum:`Difficulty`
---
--- @return HighScore
function Profile:GetHighScoreForCourseAndTrail(course, difficulty, stepsType) end

--- Clears scores for a course and trail
---
--- |since_notitg_v4_2_0|
---
--- @param course Course The course
--- @param stepsType int The steps type - see :cpp:enum:`StepsType`
--- @param difficulty int The difficulty - see :cpp:enum:`Difficulty`
---
--- @return void
function Profile:ClearHighScoresForCourseAndTrail(course, difficulty, stepsType) end

--- Clears scores for a course
---
--- |since_notitg_v4_2_0|
---
--- @param course Course The course
---
--- @return void
function Profile:ClearHighScoresForCourse(course) end

--- Tests for equality against another userdata object
---
--- |since_unk|
---
--- @param other userdata The object to test for equality against
---
--- @return boolean
function Profile:__eq(other) end

--- Returns a ``Profile (MemoryAddress)`` string
---
--- |since_unk|
---
--- @return string
function Profile:__tostring() end

return Profile
