#include <iostream>
#include <fstream>
using namespace std;
//this programm reads out student names from a plain text file (named "studends.txt" ;one name per line) and allows assigning a numeric grade for each student
//it saves the grades in grades.txt - let the program write the file

	const int smax = 20;//maximum number of students the program can handle for memory reserving purpuses
	string name;// students name from user input
	int number;//students position in the array
	string students[smax];//namelist of the students
	int grade [smax];//-1 is the "ungradet student" default marker
	int count = 0;//student count countet by the studengrabber()

int studentfinder (string namef){
	int found = 0;
	for (int i=0 ; i<4 ; i++){
		if ( students[i] == namef ){//identify the position of the student in the array and output it
			return i;
			found++;
		};
	};
	if ( found == 0){//-1 return as student not found
		return -1;
	};
};

bool studentgrabber (){
	fstream stud;
	string inname;
	stud.open ("students.txt" , ios::in);//getting the data with the student names
	if ( stud.is_open() ){
		while ( getline (stud,inname) ){
			students[count] = inname;//write studentnames linewise into the arrays
			count++;//counting students and changing the place in the array
		};
		stud.close();
		return false;

	}
	else{ cout<< "put a list of students in the folder" << endl ; return true ;};//condition for ending if there is no student file found

};

void gradegrabber () {
	fstream grades;
	grades.open ( "grades.txt" , ios::in);
	if ( grades.is_open() ){
		for (int i=0;i<count;i++){
			grades >> grade[i];
		};
	}
	else {
		cout << "No students have been gradet yet." << endl ;
	};
};

void gradewriter () {
	fstream grades;
	grades.open ( "grades.txt" , ios::out);
		for (int i=0;i<count;i++){
				grades << grade[i] << " " ;
		};

};

int main () {

	string yes;
	bool end = studentgrabber();
	for (int i = 0; i < count; ++i){
		grade[i] = -1;
	};
	if (end) {goto end;};//ending the program is no student file is found
	gradegrabber();
	moregrade://goto return point to continue grading
	cout << "Enter a students name" << endl;
	cin >> name;
	
	number = studentfinder(name);//check if the student is in th elist
	if ( number == -1){
		cout << name << " is not a student here." << endl ;
	}
	else{
		if ( -1 == grade[number]){//grade of ungradet students is -1 -> set a grade
			cout << name << " has not been gradet yet. Enter the grade of " << name << ":" << endl ;
			cin >> grade[number];
			cout << "The grade of " << name << " is now " << grade[number] << "." << endl ;
		}
		else{
			cout << name << "s grade is " << grade[number] << "." << endl;
		};
	};

	cout << "Do you wish to continue giving grades? (type yes to continue)"<< endl ;
	cin >> yes;
	if (yes == "yes"){
		goto moregrade;
	};
	gradewriter();
end://goto point for the no students name file found (canceling the program)

return 0 ;
};
