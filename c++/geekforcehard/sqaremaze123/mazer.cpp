#include <iostream>
#include <fstream>
#include <cstdlib>
#include <ctime>
#include <string>
#include <sstream>

using namespace std;

int main(){
	int x;
	int d;
	string line;
	wrongnr:

	cout << "enter a size for the maze" << endl;

    while (std::getline(cin, line))//getting  the input as string to make sure it can be convertet to a longlong properly
    {//its a loop so i can break when/if the string is emptied out into the long long
        stringstream ss(line);
        if (ss >> d)//streaming the string into the longlong ; so typed numbers become long long places
        {
            if (ss.eof())
            {//checking if the input could completely be convertet to a longlong
                break;
            }
        }
        cout << "Could not convert the Input into a int" << endl << "Please enter a maximum 1000 number" << endl;
        goto wrongnr;

    }
    if (d > 1000){
    	cout <<"Please enter a maximum 1000 number" << endl;
        goto wrongnr;
    }


	fstream maze;
	maze.open ( "maze.txt" , ios::out);
	srand(time(NULL));
		for (int j=0 ; j < d; j++){
			for (int i=0;i<d;i++){//writing the grades into a file in the same order the students are
				x = (rand()%3) + 1;
				maze << x;
			};
			maze << endl;
		};
		return 0;
}