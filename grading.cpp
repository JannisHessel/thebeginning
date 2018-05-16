#include <iostream>
using namespace std;

	string name;
	int number;
	string students[5] = {"Peter","Paul","Johannes","Karl","Richard"};
	short grade [5] ={-1,-1,-1,-1,-1};

int studentfinder (string namef){
	string check;
	int found = 0;
	for (int i=0 ; i<4 ; i++){
		check = students[i];
		if ( check == namef ){//identify the position of the student in the array and output it
			return i;
			found++;
		};
	};
	if ( found == 0){//-1 return as student not found
		return -1;
	};
};

int main () {

	string yes;

	moregrade://goto return point to continue grading
	cout << "Enter a students name" << endl;
	cin >> name;
	number = studentfinder(name);


	if ( number == -1){
		cout << name << " is not a student here." << endl ;
	}
	else{
		if ( -1 == grade[number]){//grade of ungradet students is -1 -> set a grade
			cout << name << " has not been gradet yet. Enter the grade of " << name << "!" << endl ;
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



return 0 ;
};
