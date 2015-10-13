from django.shortcuts import render

# Create your views here.

def index(request):
	return render(request, 'IMHere/index.html')

def home(request):
	context = {}
	if request.method == 'GET' and (not 'username' in request.session):
		return render(request, 'IMHere/index.html')

	if request.method == 'POST':
		if not 'username' in request.POST or not request.POST['username']:
			context['msg'] = 'please provide a name first!'
			return render(request, 'IMHere/index.html')
		# Got username
		username = request.POST['username']
		context['username'] = username
		request.session['username'] = username

	context['username'] = username
	print username
	return render(request, 'IMHere/home.html', context)

def send_email(request):
	context = {}
	context['email_from'] = 'Yao'

	return render(request, 'IMHere/send_email.html', context)

def get_static_map(request):
	latitude = request.GET['latitude']
	longitude = request.GET['longitude']

	url = 'https://maps.googleapis.com/maps/api/staticmap?center='+ \
	latitude+','+longitude + \
	'&zoom=15&size=400x400&maptype=roadmap&markers=color:red%7Clabel:Here%7C'+ \
	latitude+','+longitude+ \
	'&key=AIzaSyCft27UMj4DLzari4aaiSBGf1xPY7kSJCs';
	
	context = {}
	context['map'] = url# static map address
	print url
	return render(request, 'IMHere/get_static_map.html', context)

