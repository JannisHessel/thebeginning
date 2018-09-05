#include <iostream>

using namespace std;







int main(){
	int query[4][1000];
	int n,q;
	int current =0;
	cin >> n >> q;
	for(int i = 0 ; i < q ; i++){
		cin >> query[0][i] >> query[1][i] >> query[2][i] >> query[3][i];
	}
	for(int i = 0 ; i < n ; i++){
		for(int j = 0 ; j < n ; j++){
			for(int k = 0 ; k < q ; k++){
				if( j == query[0][k] && i >= query[1][k] && i <= query[3][k] ){
					current ++;
				}
			}
			cout << current<< " ";
			for(int k = 0 ; k < q ; k++){
				if ( j == query[2][k] && i >= query[1][k] && i <= query[3][k] ){
					current--;
				}

			}

		}
		cout << endl;
	}
	

	return 0;
}