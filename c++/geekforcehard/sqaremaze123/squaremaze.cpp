#include <iostream>
#include <string>
#include <cmath>
#include <fstream>
#include <stack>
using namespace std;

unsigned char maze[250000];
stack<short> memol;//saves position and advanture when there is a 3 and ways split
stack<short> memoc;
stack<short> memoa;
short maxadv = 0;
long long path = 0;

bool mazereader(){//true if there was no file found becaus eits more plesant to code
	fstream mazefile;
	string temp;//gets the lines 
	mazefile.open ( "maze.txt" , ios::in);	
	temp.reserve( 1000 );
	short lcount = 0;
	int ccount;

	if (  mazefile.is_open()){
		while ( getline(mazefile, temp)){//getting a line from the name file
			ccount = lcount*250;//skipping to the start of the next line
			for (short i=0 ; i < temp.length() ; i++){
				
				maze[ccount] += (temp[i]-'0')<<((i%4)*2);//filling the chars in 2 bit segments 1 2 and 3 - 0 is taken as a marker for a unused 2 bit sequence
				if(i%4 == 3){
					ccount++;//after filling 4 groups go to the next char
				}
			}
			lcount ++ ;

		};
		mazefile.close();
		return false;
	}
	else{
		cout << "could not open a file named maze.txt" << endl;//reaction if there was no file with the correct name
		return true;
	};
};

void mazewalker(short l, short c,short a){
	if(l > 1000 || c > 1000){
		path++;
		if(a > maxadv){
			maxadv = a;
		}
		return;
	}
	unsigned char nr = (maze[c/4+250*l]>>((c%4)*2))%4 ;
	a+=nr;
	if(nr == 1){
		c++;
	}else if(nr == 2){
		l++;
	}else if(nr == 3){
		c++;
		memol.push(l+1);
		memoc.push(c-1);
		memoa.push(a);
	}else{
		if(l == c+1 || l+1 == c){
			path++;
			if(a > maxadv){
				maxadv = a;
			}
		}
		return;
	}
	return mazewalker(l,c,a);

}


int main(){

if(	mazereader()){
	goto end;
}

memol.push(0);
memoc.push(0);
memoa.push(0);

while(!memoa.empty()){

	short l = memol.top();
	short c = memoc.top();
	short a = memoa.top();

	memol.pop();
	memoc.pop();
	memoa.pop();

	mazewalker(l,c,a);

}
cout << "adventure:"<< maxadv << " path:"<< path << endl;


end:
return 0;
}