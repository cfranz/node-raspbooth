#/bin/sh
#
# Installation script for node-raspbooth v0.1
#
# This script is specifically created for Raspbian http://www.raspbian.org
# and Raspberry Pi http://www.raspberrypi.org but should work over any
# Debian-based distribution
#
# Created and mantained by Carsten Franz
# Please send any feedback or comments to node-raspbooth@carsten-franz.eu
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.



if [ "$(whoami)" != "root" ]; then
echo "Sorry, this script must be executed with sudo or as root"
exit 1
fi

echo
echo "----------------"
echo "Updating sources"
echo "================"
echo

apt-get update

echo
echo "-------------------------"
echo "Installing node.js latest"
echo "========================="
echo

wget http://node-arm.herokuapp.com/node_latest_armhf.deb 
dpkg -i node_latest_armhf.deb

echo
echo "------------------------------"
echo "Installing additional packages"
echo "=============================="
echo

apt-get install libgphoto2-2-dev

echo
echo "--------------------------"
echo "Downloading node-raspbooth"
echo "=========================="
echo

mkdir /opt/git
cd /opt/git
git clone https://github.com/cfranz/node-raspbooth.git

chown -R pi:users /opt/git

echo
echo "----------------"
echo "Updating gphoto2"
echo "================"
echo

cd /opt/git/node-raspbooth/external/
wget https://raw.githubusercontent.com/gonzalo/gphoto2-updater/master/gphoto2-updater.sh && chmod +x gphoto2-updater.sh && sudo ./gphoto2-updater.sh

